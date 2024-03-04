import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import FolderForm from './folder/FolderForm'
import { useAppSelector } from '../app/hooks'
import useDelay from '../hooks/useDelay';

const MODAL_COMPONENTS: { [type: string]: React.FC } = {
  'folder/add': () => <FolderForm isModify={false} />,
  'folder/modify': () => <FolderForm isModify={true} />,
};

export default function Modal() {

  const { type, active } = useAppSelector(({ ui }) => ui.modal);
  const isVisible = active;
  const Component = MODAL_COMPONENTS[type];
  const visibleDelay = useDelay(isVisible);
  
  useEffect(() => {
    if (isVisible) { document.body.classList.add('stopScroll'); }
    return () => { document.body.classList.remove('stopScroll'); }
  }, [ isVisible ]);

  return (
    <ModalContainer>
      <ModalWrapper $active={isVisible} $delay={visibleDelay}>
        <Component />
      </ModalWrapper>
      <ModalDimmed $active={isVisible} $delay={visibleDelay} />
    </ModalContainer>
  )
}

const ModalContainer = styled.div`
    position: absolute;
    z-index: 998;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
`;

const ModalWrapper = styled.div<{ $active: boolean, $delay: boolean }>`
  position: relative;
  z-index: 999;
  width: 100%;
  max-width: 420px;
  padding: 24px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.grayScale000};
  box-shadow: 10px 10px 20px rgba(20,20,40,0.1), -10px -10px 20px rgba(20,20,40,0.1);
  visibility: ${({ $active }) => $active ? 'visible' : 'hidden'};
  transform: translateY(-20%);
  ${({ $delay }) => $delay && css`transform: translateY(-8%);`}
  opacity: ${({ $delay }) => $delay ? 1 : 0};
  transition: transform 0.3s ease-out, opacity 0.3s, background 0.3s, border 0.3s;
  transition-delay: transform 0.18s, opacity 0.18s;
  pointer-events: ${({ $active }) => $active ? 'all' : 'none'};
`

const ModalDimmed = styled.div<{ $active: boolean, $delay: boolean }>`
  position: absolute;
  z-index: 997;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: rgba(${({ theme }) => theme.current === 'light' ? '0,0,10,0.3' : '250,250,255,0.1'});
  /* backdrop-filter: blur(4px); */
  visibility: ${({ $active }) => $active ? 'visible' : 'hidden'};
  opacity: ${({ $delay }) => $delay ? 1 : 0};
  transition: opacity 0.3s, background 0.3s,;
  pointer-events: ${({ $active }) => $active ? 'all' : 'none'};
`