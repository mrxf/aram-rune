import { Card, Row } from "antd";
import React from "react";
import LoadingSkeleton from "../loadingInput";

interface ContentSkeletonProps {}

/** 主Body区域的骨架屏 */
const ContentSkeleton: React.FC<ContentSkeletonProps> = () => {
  return (
    <div>
      <Card className="mb-16">
        <Row gutter={16}>
          <LoadingSkeleton colSpan={8} isLoading />
          <LoadingSkeleton colSpan={8} isLoading />
        </Row>
      </Card>
      <Card>
        <Row gutter={16}>
          {Array(100)
            .fill(0)
            .map((item, index) => (
              <LoadingSkeleton key={ index } colSpan={1} isLoading />
            ))}
        </Row>
      </Card>
    </div>
  );
};

export default ContentSkeleton;
