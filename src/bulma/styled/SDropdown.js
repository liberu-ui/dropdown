import styled from 'vue-styled-components';

const styleProps = {
    isRTL: Boolean,
    };

const SDropdown = styled('div', styleProps)`

span[class*='icon angle'] {
    // left: 0.5rem;
    ${props => !props.isRTL ? 'left' : 'right'}: 0.5rem;
  }

`;

export default SDropdown;