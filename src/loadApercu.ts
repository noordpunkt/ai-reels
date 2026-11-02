import { continueRender, delayRender, staticFile } from "remotion";

const handle = delayRender("Apercu");

const files: Array<{
  family: string;
  file: string;
  weight: string;
}> = [
  { family: "Apercu", file: "fonts/apercu-light.otf", weight: "300" },
  { family: "Apercu", file: "fonts/apercu-regular.woff", weight: "400" },
  { family: "Apercu", file: "fonts/apercu-medium.woff", weight: "500" },
  { family: "Apercu", file: "fonts/apercu-bold.woff", weight: "700" },
  { family: "Apercu Mono", file: "fonts/apercu-mono.otf", weight: "400" },
];

Promise.all(
  files.map(async ({ family, file, weight }) => {
    const face = new FontFace(family, `url(${staticFile(file)})`, {
      weight,
      style: "normal",
    });
    const loaded = await face.load();
    document.fonts.add(loaded);
  }),
)
  .then(() => continueRender(handle))
  .catch((error) => {
    console.error(error);
    continueRender(handle);
  });
