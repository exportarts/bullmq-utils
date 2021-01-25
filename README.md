# bullmq-utils

[![npm](https://img.shields.io/npm/v/bullmq-utils)](https://npmjs.com/bullmq-utils)
[![Build Status](https://github.com/exportarts/bullmq-utils/workflows/ci/badge.svg)](https://github.com/exportarts/bullmq-utils/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=exportarts_bullmq-utils&metric=alert_status)](https://sonarcloud.io/dashboard?id=exportarts_bullmq-utils)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=exportarts_bullmq-utils&metric=coverage)](https://sonarcloud.io/dashboard?id=exportarts_bullmq-utils)

Utility classes and functions for [bullmq](https://github.com/taskforcesh/bullmq).

## Demo

[![asciicast](https://asciinema.org/a/386978.svg)](https://asciinema.org/a/386978)

You can run a demo before integrating this into you application by running `npm run demo`.
This will start a local redis instance with `docker-compose` and start a sample script
with a single [`QueueManager`](./src/queue-manager.ts) and [`QueueWorker`](./src/queue-worker.ts).

You can open [http://localhost:7000](http://localhost:7000) to view the tasks inside redis.

## Contributing

Contributions via issues or Pull Requests are welcome!

When making commits, please follow the commit message guidelines from
[conventionalcommits.org](https://www.conventionalcommits.org).
This makes it easy to auto-generate a changelog.

Have a look at previous commits in this repo for examples.
