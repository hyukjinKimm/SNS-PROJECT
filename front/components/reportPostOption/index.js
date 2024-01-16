import React, { useCallback } from "react";
import { Space, Button } from "antd";
import { Overlay } from "./styles";
import { useDispatch } from "react-redux";
import { reportPost } from "../../reducers/post";

const ReportPostOption = ({ id, onCloseReportOption }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Overlay>
        <div style={{ fontSize: "200px", marginLeft: "37%" }}>
          <Space style={{ width: "20%" }}>
            <Space.Compact direction="vertical" style={{ width: 300 }}>
              <Button
                onClick={useCallback(() => {
                  dispatch(
                    reportPost({
                      postId: id,
                    })
                  );
                }, [])}
              >
                못생겼음
              </Button>
              <Button
                onClick={useCallback(() => {
                  dispatch(
                    reportPost({
                      postId: id,
                    })
                  );
                }, [])}
              >
                스팸
              </Button>
              <Button
                onClick={useCallback(() => {
                  dispatch(
                    reportPost({
                      postId: id,
                    })
                  );
                }, [])}
              >
                이상한 게시글을 올림
              </Button>
              <Button
                onClick={useCallback(() => {
                  dispatch(
                    reportPost({
                      postId: id,
                    })
                  );
                }, [])}
              >
                혐오발언 또는 상징
              </Button>
              <Button
                onClick={useCallback(() => {
                  dispatch(
                    reportPost({
                      postId: id,
                    })
                  );
                }, [])}
              >
                폭력 또는 위험한 단체
              </Button>
              <Button
                onClick={useCallback(() => {
                  dispatch(
                    reportPost({
                      postId: id,
                    })
                  );
                }, [])}
                style={{
                  color: "red",
                }}
              >
                그냥 마음에 안듦
              </Button>
              <Button
                size="large"
                style={{ color: "blue" }}
                onClick={onCloseReportOption}
              >
                닫기
              </Button>
            </Space.Compact>
          </Space>
        </div>
      </Overlay>
    </>
  );
};

export default ReportPostOption;
