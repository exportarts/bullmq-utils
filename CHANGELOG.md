# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.1.0](https://github.com/exportarts/bullmq-utils/compare/v1.0.2...v1.1.0) (2021-03-25)


### Features

* add nestjs variants of manager and worker ([bd601bc](https://github.com/exportarts/bullmq-utils/commit/bd601bcebf30d23dfa98efa0e7014871d2f75410))

### [1.0.2](https://github.com/exportarts/bullmq-utils/compare/v1.0.1...v1.0.2) (2021-02-07)


### Bug Fixes

* **clean-up-jobs:** remove after execution ([1dee5df](https://github.com/exportarts/bullmq-utils/commit/1dee5df0bb394752f2e533e26e64671d044f9241))

### [1.0.1](https://github.com/exportarts/bullmq-utils/compare/v1.0.0...v1.0.1) (2021-01-25)


### Bug Fixes

* **cleanup:** handle queue names that include the job name delimiter ([dde7350](https://github.com/exportarts/bullmq-utils/commit/dde7350b1a531aad589d4f0934c1410b12a7d51c))
* **cleanup:** handle queue names that include the job name delimiter ([80474c8](https://github.com/exportarts/bullmq-utils/commit/80474c84429a31521b4c737526b06554d42e4bd7))
* **manager:** correctly schedule repeatable jobs ([eb31b0c](https://github.com/exportarts/bullmq-utils/commit/eb31b0c3535b95e8a5a551740383ce3b468ff4a9))

## [1.0.0](https://github.com/exportarts/bullmq-utils/compare/v0.2.0...v1.0.0) (2021-01-25)


### ⚠ BREAKING CHANGES

* The QueueManager and QueueWorker classes now accept their optional arguments in a single options object.

* move constructor args to options object ([f1c994f](https://github.com/exportarts/bullmq-utils/commit/f1c994f8387a59225e54684332bf36785e19171c))

## [0.2.0](https://github.com/exportarts/bullmq-utils/compare/v0.1.9...v0.2.0) (2021-01-02)

### [0.1.9](https://github.com/exportarts/bullmq-utils/compare/v0.1.8...v0.1.9) (2021-01-02)

### [0.1.8](https://github.com/exportarts/bullmq-utils/compare/v0.1.7...v0.1.8) (2021-01-02)

### [0.1.7](https://github.com/exportarts/bullmq-utils/compare/v0.1.6...v0.1.7) (2021-01-02)


### Features

* **queue-options:** add validation ([1d01a87](https://github.com/exportarts/bullmq-utils/commit/1d01a87f1d71628a7c9b859b11142652c64bdf01))
* **task-processor-logger:** allow end() without start time ([379096f](https://github.com/exportarts/bullmq-utils/commit/379096f12320e7b340633f58f0878b50c4059aa6))

### [0.1.6](https://github.com/exportarts/bullmq-utils/compare/v0.1.5...v0.1.6) (2020-12-18)


### Bug Fixes

* **build:** add module "commonjs" setting ([6e3540d](https://github.com/exportarts/bullmq-utils/commit/6e3540db6aed2b455b1b1c25ba661ab507a5817e))

### [0.1.5](https://github.com/exportarts/bullmq-utils/compare/v0.1.4...v0.1.5) (2020-12-18)


### Bug Fixes

* **queue-manager:** add explicit return type ([a327ed7](https://github.com/exportarts/bullmq-utils/commit/a327ed72472bf9b9e0f41678c22cadec0c555b9a))

### [0.1.4](https://github.com/exportarts/bullmq-utils/compare/v0.1.3...v0.1.4) (2020-12-18)


### Bug Fixes

* **queue-worker:** remove unused constructor arg ([c08a585](https://github.com/exportarts/bullmq-utils/commit/c08a5851093d3f7a0ffa92d96aa62249a17af01e))

### [0.1.3](https://github.com/exportarts/bullmq-utils/compare/v0.1.2...v0.1.3) (2020-12-18)


### Features

* add TaskProcessorLogger ([342aa82](https://github.com/exportarts/bullmq-utils/commit/342aa822c08cd478ed921847428d4aaebe27ba04))

### [0.1.2](https://github.com/exportarts/bullmq-utils/compare/v0.1.1...v0.1.2) (2020-12-18)


### Bug Fixes

* **build:** add declarations ([af4db09](https://github.com/exportarts/bullmq-utils/commit/af4db0997ffbb8a6e41098a80370952a0f9f2d28))

### 0.1.1 (2020-12-18)


### Features

* add backoff, queue-manager and queue-worker ([5552ddb](https://github.com/exportarts/bullmq-utils/commit/5552ddb4dd98fc2388f1b734a4d8d901bb797bfb))
