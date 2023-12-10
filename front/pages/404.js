import React, { useCallback, useEffect } from "react";
import { wrapper } from "../store/configureStore";
import { Button, Result } from "antd";
import { useRouter } from "next/router";
import * as screenActions from "../reducers/screen";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMyInfo } from "../reducers/user";
const eror404 = ({ error404Props }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const onClickHome = useCallback(() => {
    router.replace("/");
  }, []);

  useEffect(() => {
    dispatch(getMyInfo());
    dispatch(screenActions.changeMenu("HOME"));
  }, []);

  return (
    <Result
      status="404"
      title="404"
      subTitle={error404Props}
      extra={
        <Button onClick={onClickHome} type="primary">
          Back Home
        </Button>
      }
    />
  );
};

export async function getStaticProps(d) {
  // 서버에서 데이터를 미리 받아옵니다.
  // 아래 props는 서버쪽에서 데이터를 받아왔다는 가정하에 props 데이터를 넘겨줍니다.

  return {
    props: { error404Props: "페이지를 찾을 수 없습니다." },
  };
}
export default eror404;
