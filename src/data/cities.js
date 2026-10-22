// 100+ seed cities. Format: Name|Country|lat|lon
const RAW = {
  Africa: `Cairo|Egypt|30.04|31.24;Lagos|Nigeria|6.52|3.38;Nairobi|Kenya|-1.29|36.82;Johannesburg|South Africa|-26.20|28.05;Cape Town|South Africa|-33.92|18.42;Casablanca|Morocco|33.57|-7.59;Addis Ababa|Ethiopia|9.03|38.74;Accra|Ghana|5.60|-0.19;Algiers|Algeria|36.75|3.04;Dakar|Senegal|14.72|-17.47;Tunis|Tunisia|36.81|10.18;Dar es Salaam|Tanzania|-6.79|39.21;Kinshasa|DR Congo|-4.44|15.27;Luanda|Angola|-8.84|13.23;Khartoum|Sudan|15.50|32.56;Abidjan|Ivory Coast|5.36|-4.01;Tripoli|Libya|32.89|13.19`,
  Asia: `Almaty|Kazakhstan|43.24|76.89;Astana|Kazakhstan|51.17|71.43;Tashkent|Uzbekistan|41.30|69.24;Bishkek|Kyrgyzstan|42.87|74.59;Tokyo|Japan|35.68|139.69;Seoul|South Korea|37.57|126.98;Beijing|China|39.90|116.41;Shanghai|China|31.23|121.47;Hong Kong|China|22.32|114.17;Singapore|Singapore|1.35|103.82;Bangkok|Thailand|13.76|100.50;Hanoi|Vietnam|21.03|105.85;Jakarta|Indonesia|-6.21|106.85;Manila|Philippines|14.60|120.98;Kuala Lumpur|Malaysia|3.14|101.69;Delhi|India|28.61|77.21;Mumbai|India|19.08|72.88;Dhaka|Bangladesh|23.81|90.41;Karachi|Pakistan|24.86|67.01;Tehran|Iran|35.69|51.39;Dubai|UAE|25.20|55.27;Riyadh|Saudi Arabia|24.71|46.68;Istanbul|Turkey|41.01|28.98;Baku|Azerbaijan|40.41|49.87;Tbilisi|Georgia|41.72|44.79;Ulaanbaatar|Mongolia|47.89|106.91;Kathmandu|Nepal|27.72|85.32;Colombo|Sri Lanka|6.93|79.86;Taipei|Taiwan|25.03|121.57;Kabul|Afghanistan|34.53|69.17;Baghdad|Iraq|33.31|44.36;Jerusalem|Israel|31.77|35.21`,
  Europe: `London|United Kingdom|51.51|-0.13;Paris|France|48.86|2.35;Berlin|Germany|52.52|13.41;Madrid|Spain|40.42|-3.70;Rome|Italy|41.90|12.50;Moscow|Russia|55.76|37.62;Kyiv|Ukraine|50.45|30.52;Warsaw|Poland|52.23|21.01;Vienna|Austria|48.21|16.37;Prague|Czechia|50.08|14.44;Stockholm|Sweden|59.33|18.07;Oslo|Norway|59.91|10.75;Helsinki|Finland|60.17|24.94;Lisbon|Portugal|38.72|-9.14;Athens|Greece|37.98|23.73;Amsterdam|Netherlands|52.37|4.90;Dublin|Ireland|53.35|-6.26;Reykjavik|Iceland|64.15|-21.94;Budapest|Hungary|47.50|19.04;Zurich|Switzerland|47.38|8.54;Brussels|Belgium|50.85|4.35;Copenhagen|Denmark|55.68|12.57;Minsk|Belarus|53.90|27.57;Bucharest|Romania|44.43|26.10;Sofia|Bulgaria|42.70|23.32`,
  'North America': `New York|USA|40.71|-74.01;Los Angeles|USA|34.05|-118.24;Chicago|USA|41.88|-87.63;Toronto|Canada|43.65|-79.38;Mexico City|Mexico|19.43|-99.13;Vancouver|Canada|49.28|-123.12;Miami|USA|25.76|-80.19;San Francisco|USA|37.77|-122.42;Houston|USA|29.76|-95.37;Havana|Cuba|23.11|-82.37;Montreal|Canada|45.50|-73.57;Seattle|USA|47.61|-122.33;Denver|USA|39.74|-104.99`,
  'South America': `Sao Paulo|Brazil|-23.55|-46.63;Buenos Aires|Argentina|-34.60|-58.38;Lima|Peru|-12.05|-77.04;Bogota|Colombia|4.71|-74.07;Santiago|Chile|-33.45|-70.67;Rio de Janeiro|Brazil|-22.91|-43.17;Caracas|Venezuela|10.48|-66.90;Quito|Ecuador|-0.18|-78.47;Montevideo|Uruguay|-34.90|-56.16;La Paz|Bolivia|-16.50|-68.15`,
  Oceania: `Sydney|Australia|-33.87|151.21;Melbourne|Australia|-37.81|144.96;Auckland|New Zealand|-36.85|174.76;Perth|Australia|-31.95|115.86;Brisbane|Australia|-27.47|153.03;Wellington|New Zealand|-41.29|174.78;Suva|Fiji|-18.14|178.44`,
}

export const CONTINENTS = Object.keys(RAW)

export const SEED_CITIES = Object.entries(RAW).flatMap(([continent, list]) =>
  list.split(';').map((row) => {
    const [name, country, lat, lon] = row.split('|')
    return { id: `${name}-${country}`.toLowerCase().replace(/\s+/g, '-'), name, country, continent, lat: +lat, lon: +lon }
  })
)
