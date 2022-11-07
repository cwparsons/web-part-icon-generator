import { optimize } from 'svgo';
import TextToSVG from 'text-to-svg';

const textToSVGObjects = {};

export function textToSvgLoad(url: string): Promise<TextToSVG> {
  return new Promise((resolve, reject) => {
    if (textToSVGObjects[url]) {
      resolve(textToSVGObjects[url]);

      return;
    }

    TextToSVG.load(url, function (err, textToSVG) {
      if (err || !textToSVG) {
        reject();

        return;
      }

      textToSVGObjects[url] = textToSVG;

      resolve(textToSVG);
    });
  });
}

export async function getSvg(text: string, appendSvg?: string, fontSrc = '/fabric-mdl2-external-d189c236.woff'): Promise<string> {
  const options = { x: 0, y: 0, fontSize: 28, anchor: 'top' } as const;

  const textToSVG = await textToSvgLoad(fontSrc);

  const svg = textToSVG.getSVG(text, options);
  const result = optimize(svg);

  if (appendSvg) {
    result.data = result.data.replace('</svg>', `${appendSvg}</svg>`);
  }

  return result.data;
}
