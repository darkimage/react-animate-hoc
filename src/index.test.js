import { withAnimated } from '.';
import React from 'react';
import { cleanup, fireEvent, render } from "@testing-library/react";

test('Should Render simple component', () => {
  const Component = withAnimated(function (){
    return <div>Simple Component</div>
  })
  const {getByText} = render(
    <Component/>,
  );

  expect(getByText(/Simple Component/)).toBeTruthy()
})
