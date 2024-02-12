import React from 'react'
import { MenuToggleBtn } from './Button.style'

export default function PinBtn() {
  return (
    <MenuToggleBtn $active={false} title={false ? '고정 해제' : '메모 고정'}>
        {/* outline */}
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="m16.475 4.375l3.172 3.176c1.008 1.008 1.824 1.825 2.35 2.535c.541.73.891 1.5.701 2.377c-.19.879-.826 1.434-1.62 1.875c-.773.429-1.854.835-3.187 1.336l-1.977.743c-.795.298-1.011.391-1.172.53c-.08.07-.153.15-.216.237c-.124.173-.197.397-.422 1.216l-.013.045c-.228.831-.417 1.517-.624 2.032c-.21.523-.493 1.018-1.002 1.309a2.335 2.335 0 0 1-1.16.307c-.587 0-1.078-.292-1.519-.642c-.434-.346-.936-.85-1.545-1.46l-1.588-1.588l-4.122 4.127a.75.75 0 0 1-1.062-1.06l4.124-4.128l-1.535-1.537C3.453 15.2 2.954 14.7 2.61 14.268c-.349-.438-.638-.926-.642-1.508a2.34 2.34 0 0 1 .313-1.182c.29-.505.782-.786 1.302-.995c.512-.205 1.193-.393 2.018-.62l.045-.013c.82-.226 1.045-.3 1.217-.424c.09-.064.17-.139.242-.222c.138-.163.23-.38.523-1.18l.716-1.956c.495-1.349.895-2.442 1.32-3.222c.437-.803.99-1.448 1.872-1.642c.882-.195 1.655.158 2.389.702c.712.53 1.535 1.353 2.55 2.369M13.03 3.21c-.602-.448-.921-.498-1.171-.443c-.25.055-.519.235-.878.895c-.365.67-.729 1.658-1.25 3.081L9.036 8.64l-.04.108c-.233.64-.414 1.136-.75 1.529a2.875 2.875 0 0 1-.506.467c-.42.302-.927.441-1.585.622l-.11.03c-.882.243-1.48.41-1.903.58c-.425.17-.527.29-.562.35a.84.84 0 0 0-.112.424c0 .07.03.225.316.584c.284.357.722.797 1.368 1.444l4.117 4.12c.65.652 1.093 1.093 1.452 1.38c.36.286.516.315.585.315a.834.834 0 0 0 .416-.11c.06-.034.181-.136.353-.564c.171-.427.338-1.03.582-1.917l.03-.11c.18-.657.32-1.164.62-1.583a2.88 2.88 0 0 1 .453-.496c.39-.337.882-.522 1.519-.76l.107-.04l1.917-.72c1.408-.53 2.383-.898 3.046-1.266c.651-.361.829-.63.883-.88c.054-.251.003-.57-.44-1.168c-.452-.61-1.187-1.349-2.251-2.413L15.459 5.48c-1.071-1.072-1.816-1.814-2.429-2.27" clipRule="evenodd"></path></svg>
        {/* fill */}
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m19.184 7.805l-2.965-2.967c-2.027-2.03-3.04-3.043-4.129-2.803c-1.088.24-1.581 1.587-2.568 4.28l-.668 1.823c-.263.718-.395 1.077-.632 1.355a2.035 2.035 0 0 1-.36.332c-.296.213-.664.314-1.4.517c-1.66.458-2.491.687-2.804 1.23a1.528 1.528 0 0 0-.204.773c.004.627.613 1.236 1.83 2.455L6.7 16.216l-4.476 4.48a.764.764 0 0 0 1.08 1.08l4.475-4.48l1.466 1.468c1.226 1.226 1.839 1.84 2.47 1.84c.265 0 .526-.068.757-.2c.548-.313.778-1.149 1.239-2.822c.202-.735.303-1.102.515-1.399c.093-.129.201-.247.322-.352c.275-.238.632-.372 1.345-.64l1.844-.693c2.664-1 3.996-1.501 4.23-2.586c.235-1.086-.77-2.093-2.783-4.107"></path></svg>
    </MenuToggleBtn>
  )
}
