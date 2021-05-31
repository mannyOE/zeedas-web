import { Cloudinary as CoreCloudinary, Util } from "cloudinary-core";
import Axios from "axios";
import { CLOUDINARY_URL, CLOUDINARY_RES_URL } from "../utils/constants";

export const url = (publicId, options) => {
  const scOptions = Util.withSnakeCaseKeys(options);
  const cl = CoreCloudinary.new();
  return cl.url(publicId, scOptions);
};

export const openUploadWidget = (options, callback) => {
  const scOptions = Util.withSnakeCaseKeys(options);
  window.cloudinary.openUploadWidget(scOptions, callback);
};

export const createLink = (file) => {
  const { public_id, type, version } = file;
  return `${CLOUDINARY_RES_URL}/raw/${type}/v${version}/${public_id}`;
};

export const uploadTestVideos = async (
  file,
  upload_preset,
  tags,
  resource_type,
  uploadProgressCallback,
  name,
  onComplete
) => {
  const formdata = new FormData();
  formdata.append("file", file);
  formdata.append("upload_preset", upload_preset);
  formdata.append("cloud_name", "zeedas");
  let url = CLOUDINARY_URL;
  if (tags) {
    formdata.append("tags", tags);
  }
  if (resource_type) {
    formdata.append("resource_type", resource_type);
    url = `https://api.cloudinary.com/v1_1/zeedas/${resource_type}/${upload_preset}`;
  }

  const config = {
    onUploadProgress: (progressEvent) => {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      uploadProgressCallback(name, percentCompleted);
    },
  };
  try {
    const { data } = await Axios.post(
      url,
      formdata,
      uploadProgressCallback ? config : {}
    );
    onComplete(null, data);
    return data;
  } catch (error) {
    onComplete(error);
  }
};

export const fetchFiles = async (projectId, setter) => {
  const options = {
    cloudName: "zeedas",
    format: "json",
    type: "list",
    resource_type: "raw",
    upload_preset: "upload",
  };

  const urlPath = url(projectId, options);

  try {
    const text = await (await fetch(urlPath)).text();
    if (text) {
      setter(JSON.parse(text).resources);
    } else {
      setter([]);
    }
  } catch (error) {
    
    setter([]);
  }
};

export const createPDFThumbnail = async (pathToPDF) => {
  const pdfjs = await import("pdfjs-dist/build/pdf");
  const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry");
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  const createThumbnail = async (page) => {
    const vp = page.getViewport({ scale: 1 });
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 96;
    const scale = Math.min(canvas.width / vp.width, canvas.height / vp.height);
    return await page
      .render({
        canvasContext: canvas.getContext("2d"),
        viewport: page.getViewport({ scale }),
      })
      .promise.then(() => {
        return canvas;
      });
  };

  try {
    const doc = await pdfjs.getDocument(pathToPDF).promise.then((pdf) => {
      return pdf;
    });
    const pageOne = await doc.getPage(1);
    const canvas = await createThumbnail(pageOne);
    return canvas.toDataURL("image/png");
  } catch (error) {
    
  }
};
