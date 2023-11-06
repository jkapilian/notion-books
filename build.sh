#!/bin/bash

SOURCE=$(dirname $0)
cd "$SOURCE"
cd code
npm run build
cd ../cdk
cdk synth