import React from 'react'
import { MenuToggleBtn } from './Button.style'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { changeLockedState } from '../../../app/actions/note';

export default function LockBtn() {

  const { tempData } = useAppSelector(({ note }) => note);
  const isDisabled = tempData === null || !tempData.modifiable;
  const isActive = (tempData?.isLocked ?? false) && (tempData?.modifiable ?? true);
  const dispatch = useAppDispatch();

  return (
    <MenuToggleBtn $active={isActive} disabled={isDisabled} title={isActive ? '잠금 해제' : '메모 잠금'} onClick={() => dispatch(changeLockedState(null))}>
      {/* outline */}
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M6.75 8a5.25 5.25 0 0 1 10.335-1.313a.75.75 0 0 0 1.452-.374A6.75 6.75 0 0 0 5.25 8v1.303c-.227.016-.44.036-.642.064c-.9.12-1.658.38-2.26.981c-.602.602-.86 1.36-.981 2.26c-.117.867-.117 1.97-.117 3.337v.11c0 1.367 0 2.47.117 3.337c.12.9.38 1.658.981 2.26c.602.602 1.36.86 2.26.982c.867.116 1.97.116 3.337.116h8.11c1.367 0 2.47 0 3.337-.116c.9-.122 1.658-.38 2.26-.982c.602-.602.86-1.36.982-2.26c.116-.867.116-1.97.116-3.337v-.11c0-1.367 0-2.47-.116-3.337c-.122-.9-.38-1.658-.982-2.26c-.602-.602-1.36-.86-2.26-.981c-.867-.117-1.97-.117-3.337-.117h-8.11c-.423 0-.821 0-1.195.003zm-3.341 3.409c.277-.277.665-.457 1.4-.556c.754-.101 1.756-.103 3.191-.103h8c1.435 0 2.436.002 3.192.103c.734.099 1.122.28 1.399.556c.277.277.457.665.556 1.4c.101.755.103 1.756.103 3.191c0 1.435-.002 2.436-.103 3.192c-.099.734-.28 1.122-.556 1.399c-.277.277-.665.457-1.4.556c-.755.101-1.756.103-3.191.103H8c-1.435 0-2.437-.002-3.192-.103c-.734-.099-1.122-.28-1.399-.556c-.277-.277-.457-.665-.556-1.4c-.101-.755-.103-1.756-.103-3.191c0-1.435.002-2.437.103-3.192c.099-.734.28-1.122.556-1.399" clipRule="evenodd"></path></svg>
      {/* fill */}
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M5.25 10.055V8a6.75 6.75 0 0 1 13.5 0v2.055c1.115.083 1.84.293 2.371.824C22 11.757 22 13.172 22 16c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16c0-2.828 0-4.243.879-5.121c.53-.531 1.256-.741 2.371-.824M6.75 8a5.25 5.25 0 0 1 10.5 0v2.004C16.867 10 16.451 10 16 10H8c-.452 0-.867 0-1.25.004z" clipRule="evenodd"></path></svg>
    </MenuToggleBtn>
  )
}
