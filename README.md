# hswf

Angular project

Python Flask + JS Angular

## Dependencies

```bash
sudo apt-get install nodejs npm python python-pip
sudo npm i -g n
sudo n latest
```

## Setup

```bash
bash install.sh
npm i
bower install
flask/bin/python db_create.py
grunt server
```

## Deploy

```bash
git push heroku jbp/deploy:master
# may be facultative
heroku run bash
python db_create.py
```

## Demo

https://hswf.herokuapp.com
