import { FC } from "react";
import { Circles } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader: FC = () => {
  return (
    <div className={css.loader}>
      <Circles
        height={100}
        width={100}
        color="rgb(91, 91, 194)"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
