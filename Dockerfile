FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

COPY package.json .

RUN curl -s https://raw.githubusercontent.com/PencariKode/gitignore/main/.gitignore -o .gitignore

RUN npm install && npm install qrcode-terminal && npm install pm2 -g 

COPY . .

EXPOSE 5000

RUN git branch db

CMD ["node", "index.js"]
