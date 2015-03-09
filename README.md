# complex-node-deployment
This is an example of a complex node deployment based on docker and docker-compose


## Requirements

- docker cli
- a running docker instance, for example on boot2docker
- docker-compose

## Components

    Linked containers:

           [admin]   [worker]
                 |   |
                 |   |
     [mongodb]---[api]---[redis]
                 |   |
                 |   |
            [site]   [mobile]

    The container [status] is linked to all the above.
    The container [static] has no links.

These ports are defined in `docker-compose.yml` and exposed to your docker host:

    admin:   10078
    worker:  10077
    api:     10079
    site:    10080
    mobile:  10081
    static:  10082
    status:  10083
    mongodb: 10069
    redis:   10068


## Start deployment

Make sure that docker is running.

    $ docker-compose up

### Force removal of all images in this project

    $ docker rmi -f $(docker images |  grep complexnode | tr -s ' ' | cut -d ' ' -f 3)

### Force removal of *ALL* running containers

    $ docker rm -f $(docker ps -aq)


## Some helpful tools

### [Shipyard](https://github.com/shipyard/shipyard) installation

    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock shipyard/deploy start


### [cAdvisor](https://github.com/google/cadvisor) installation

    docker run --volume=/:/rootfs:ro --volume=/var/run:/var/run:rw --volume=/sys:/sys:ro --volume=/var/lib/docker/:/var/lib/docker:ro --publish=8080:8080 --detach=true --name=cadvisor google/cadvisor:latest
