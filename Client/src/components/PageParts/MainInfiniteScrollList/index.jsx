import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {List} from 'antd';

export default (props) => {
  const {loadMore, isFetching, hasMore, dataSource, renderItem, grid, isReverse} = props;
  return (
    <InfiniteScroll
      isReverse={isReverse}
      initialLoad={false}
      loadMore={loadMore}
      hasMore={hasMore}
      loader={<div className="loader" key={0}/>}
      useWindow={false}
      getScrollParent={() =>
        document.querySelector('#test-pro-layout div section section')
      }
    >
      <List
        size="large"
        rowKey="id"
        loading={isFetching}
        dataSource={dataSource}
        renderItem={renderItem}
        grid={grid}
      />
    </InfiniteScroll>
  );
};
