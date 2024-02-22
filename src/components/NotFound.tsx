import React from 'react'
import styled from 'styled-components'

export default function NotFound() {

  return (
    <NotFoundContainer>
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path stroke="currentColor" strokeWidth={1.5} d="M3 10.417c0-3.198 0-4.797.378-5.335c.377-.537 1.88-1.052 4.887-2.081l.573-.196C10.405 2.268 11.188 2 12 2c.811 0 1.595.268 3.162.805l.573.196c3.007 1.029 4.51 1.544 4.887 2.081C21 5.62 21 7.22 21 10.417v1.574c0 5.638-4.239 8.375-6.899 9.536C13.38 21.842 13.02 22 12 22s-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991z"></path><path stroke="currentColor" strokeLinecap="round" strokeWidth={1.5} d="M12 8v4"></path><circle cx={12} cy={15} r={1} fill="currentColor"></circle></g></svg>
      <p>잘못된 접근입니다</p>
    </NotFoundContainer>
  )
}

// styled components
const NotFoundContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px 20px 80px;
  color: #E14B4D;

  p {
    margin: 8px 0px 0px;
    font-size: 16px;
    font-weight: 500;
    color: inherit;
    text-align: center;
  }
  svg {font-size: 32px;}
`;