import { Stack, StackProps } from "@aws-cdk/core";
import { Construct } from "constructs";

export class TaggedStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const stackContextNames = ['stacks:*', `stacks:${id}`];
    const stackContexts = stackContextNames.map(name => this.node.tryGetContext(name) ?? {});

  }
}
