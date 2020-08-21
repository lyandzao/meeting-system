/**
 * @ Author: zao
 * @ Create Time: 2020-08-20 18:49:22
 * @ Modified by: zao
 * @ Description: 组合多个unstated-next container
 */

import React from 'react';

import { Container } from 'unstated-next';

export default function compose(...containers: any) {
  return function Component(props: any) {
    return containers.reduceRight((children: React.ReactChildren, Container: Container<any>) => {
      return <Container.Provider>{children}</Container.Provider>
    }, props.children)
  }
}