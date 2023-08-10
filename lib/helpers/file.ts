import { onError} from "@apollo/client/link/error";
import saveAs from "file-saver";

export async function saveFile(
  promise: () => Promise<any>,
  fileType: "excel",
  fileName: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (fileName: string) => void;
    onError?: (message: string) => any;
  }
) {
  let type;
  let ext;

  switch (fileType) {
    case "excel":
      type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      ext = ".xlsx";
      break;
    default:
      break;
  }

  try {
    const res = await promise();
    const blob = new Blob([res], {
      type,
    });
    saveAs(blob, `${fileName}${ext}`);
    if (onSuccess) onSuccess(`${fileName}${ext}`);
  } catch (err) {
    console.error(err);
    if (onError) onError(`${JSON.parse(await err.text()).message}`);
  }
}
