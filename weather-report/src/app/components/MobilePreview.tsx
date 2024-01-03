import { forecastData } from '../lib';

export default function MobilePreview() {
  console.log('Rendering MobilePreview component');
  const data = forecastData();
  console.log(`Mobile Preview ${data}`);
  return <div></div>;
}
