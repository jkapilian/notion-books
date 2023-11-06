import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
// import { EventbridgeToLambdaProps, EventbridgeToLambda } from '@aws-solutions-constructs/aws-eventbridge-lambda';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const notionLambda = new lambda.Function(this, "NotionFunction", {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset("../code"),
      handler: "dist/index.handler",
      functionName: "NotionFunction",
      timeout: cdk.Duration.seconds(30)
    });

    const rule = new events.Rule(this, "EventRule", {
      schedule: events.Schedule.rate(cdk.Duration.minutes(1))
    });

    rule.addTarget(new targets.LambdaFunction(notionLambda));

  }
}
