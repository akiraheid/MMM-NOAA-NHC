# MMM-NOAA-NHC
Display information from the U.S. National Oceanic and Atmospheric Administration (NOAA) National Hurricane Center (NHC) Graphical Tropical Weather Outlooks [RSS feed](https://www.nhc.noaa.gov/gtwo.xml) for the [Magic Mirror](https://github.com/MichMich/MagicMirror).

## Preview

![Module preview](preview.png)

## Configuration

| Option           |  Default  | Description
|------------------|:---------:|------------
| `showOnlyActive` |  `true`   | *(Optional)* Display graphics only when there is activity in that region; text saying there is none otherwise. Accepts `[true, false]`
| `showPacific`    |  `true`   | *(Optional)* Display Pacific information. Accepts `[true, false]`
| `showAtlantic`   |  `true`   | *(Optional)* Display Atlantic information. Accepts `[true, false]`
| `updateInterval` | `3600000` | *(Optional)* Milliseconds until next update of images.
