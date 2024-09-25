import * as React from "react";
import FormContainer from "../FormContainer/FormContainer";
import { UrlData } from "../../interface/UrlData";
import axios from "axios";
import { serverURL } from "../../helpers/constant";
import DataTable from "../DataTable/DataTable";

interface IContainerProps {}

const Container: React.FunctionComponent<IContainerProps> = () => {
  const [data, setData] = React.useState<UrlData>([]);
  const [reload,setReload] = React.useState<boolean>(false);

  const updateReloadState = ():void=>{
    setReload(true);
  }

  const fetchTableData = async () => {
    const response = await axios.get(`${serverURL}/shortUrl`);
    console.log("The response from server is :", response);
    setData(response.data);
  };

  React.useEffect(() => {
    fetchTableData();
  }, [reload]);

  return (
    <>
      <FormContainer />
      <DataTable updateReloadState={updateReloadState} data={data} />
    </>
  );
};

export default Container;
