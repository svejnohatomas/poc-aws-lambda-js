# Proof of Concept - AWS Lambda (JavaScript)

## Introduction

A Proof of Concept for hosting a simple web application on AWS using Lambda, DynamoDB, CloudFormation and GitHub Actions.

## Requirements

- [x] The application should be scalable and withstand an increase in load
  - DynamoDB with [On-demand capacity mode](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadWriteCapacityMode.html)
  - [Lambda functions scaling](https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html)
- [x] The application should be fault tolerant and survive availability zone failure
  - _"AWS Lambda maintains compute capacity across multiple Availability Zones (AZs) in each AWS Region to help protect your code against individual machine or data center facility failures."_ See [Resililence in AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/security-resilience.html) for more information.
  - The same applies to DynamoDB. See [Resilience and disaster recovery in Amazon DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/disaster-recovery-resiliency.html) for more information.
- [ ] Centralised logging of application and infrastructure metrics
- [ ] Secure configuration at the network level
- [x] Automatically deploys when a new version is created
  - [GitHub Actions](https://github.com/svejnohatomas/poc-aws-lambda-js/blob/master/.github/workflows/development.yaml)
