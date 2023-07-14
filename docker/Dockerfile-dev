FROM node:lts-alpine
LABEL authors="Maxime Ben Hassen <maxime.benhassen@fedabian.fr>"

RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"