import express from "express";
import { urlModel } from "../models/shortUrl";

const createUrl = async (req: express.Request, res: express.Response) => {
  try {
    const { fullUrl } = req.body;

    console.log(`The full url is`, fullUrl);

    const urlFound = await urlModel.findOne({ fullUrl });
    if (urlFound) {
      return res.status(409).send(urlFound);
    }

    const shortUrl = await urlModel.create({ fullUrl });
    return res.status(201).send(shortUrl);
  } catch (err) {
    console.error("FAILED TO CREATE URL", err);
    res.status(500).send({
      message: "FAILED TO CREATE URL",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

const getAllUrl = async (req: express.Request, res: express.Response) => {
  try {
    const shortUrls = await urlModel.find();
    if (shortUrls.length === 0) {
      return res.status(404).send({ message: "Short URLs not found !!" });
    }

    res.status(200).send(shortUrls);
  } catch (err) {
    console.error("FAILED TO GET ALL URLS", err);
    res.status(500).send({
      message: "FAILED TO GET ALL URLS",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

const getUrl = async (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id;
    const shortUrl = await urlModel.findOne({ shortUrl: id });

    if (!shortUrl) {
      return res.status(404).send({ message: "Full URL not found" });
    }

    // INCREMENT CLICKS
    shortUrl.clicks++;
    await shortUrl.save();

    // Redirect to the full URL
    return res.redirect(shortUrl.fullUrl);
  } catch (err) {
    console.error("FAILED TO GET THE URL", err);
    res.status(500).send({
      message: "FAILED TO GET THE URL",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

const deleteUrl = async (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id;
    const shortUrl = await urlModel.findByIdAndDelete(id);

    if (shortUrl) {
      return res.status(204).send({ message: "URL deleted" });
    } else {
      return res.status(404).send({ message: "URL not found" });
    }
  } catch (err) {
    console.error("FAILED TO DELETE THE URL", err);
    res.status(500).send({
      message: "FAILED TO DELETE THE URL",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export { createUrl, getAllUrl, getUrl, deleteUrl };
