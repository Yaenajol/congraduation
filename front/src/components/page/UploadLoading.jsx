// css
import Spinner from "../images/uploadSpinner.gif";
import StyledImg from "../styledComponents/StyledImg";

/**
 * 로딩 스피너
 * @returns 
 */
const UploadLoading = () => {
  return (
    <StyledImg
      src={Spinner}
      alt="lodaing"
      width={"100px"}
      height={"100px"}
    ></StyledImg>
  );
};

export default UploadLoading;
