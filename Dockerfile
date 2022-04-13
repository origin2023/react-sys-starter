

FROM nginx:1.15-alpine
LABEL app.name=origin-cloud-fe app.version=1.0.0 app.type=nginx


ADD dist.tar.gz /opt/

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 30015
