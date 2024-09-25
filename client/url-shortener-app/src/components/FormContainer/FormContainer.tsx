import * as React from "react";
import { serverURL } from "../../helpers/constant";
import axios from "axios";

interface IFormContainerProps {}

const FormContainer: React.FunctionComponent<IFormContainerProps> = () => {
  const [fullUrl, setFullUrl] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${serverURL}/shorturl`, { fullUrl: fullUrl });
      setFullUrl("");
    } catch (err) {
      console.error(
        "ERROR WHILE FORM SUBMISSION",
        err instanceof Error ? err.message : "ERROR WHILE FORM SUBMISSION"
      );
    }
  };

  return (
    <>
      <div className="container mx-auto p-2">
        <div className="bg-banner  my-8 rounded-xl bg-cover bg-center">
          <div className="w-full h-full rounded-xl p-20 backdrop-brightness-50">
            <h2 className="text-white text-4xl text-center pb-4">
              URL SHORTENER
            </h2>

            <p className="text-white text-center pb-2 text-xl font-extralight">
              Paste your untidy link to shorten it
            </p>
            <p className="text-white text-center pb-4 text-sm font-thin">
              free tool to shorten a URL or reduce link, Use our URL shortener
              to create a shortened & neat link making it easy to use{" "}
            </p>

            <form onSubmit={handleSubmit}>
              <div className="flex">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none text-slate-800">
                    urlShortener.link /
                  </div>
                  <input
                    type="text"
                    placeholder="add your link"
                    value={fullUrl}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFullUrl(e.target.value)
                    }
                    required
                    className="block ps-40 w-full p-4 text-sm text-gray-900 border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-lg border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Shorten URL
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormContainer;
