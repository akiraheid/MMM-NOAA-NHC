FROM node:17-alpine

RUN apk add git

WORKDIR /app/MagicMirror

RUN git clone https://github.com/MichMich/MagicMirror .

RUN npm install

COPY package* modules/MMM-NOAA-NHC/

RUN cd modules/MMM-NOAA-NHC \
	&& npm install

COPY MMM-NOAA-NHC.* node_helper.js modules/MMM-NOAA-NHC/
COPY mmm.config.js config/config.js

ENTRYPOINT ["npm", "run", "server"]
