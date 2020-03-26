import React from 'react';
import styled from '@emotion/styled';
import {browserHistory} from 'react-router';

import overflowEllipsis from 'app/styles/overflowEllipsis';
import Link from 'app/components/links/link';
import space from 'app/styles/space';
import {callIfFunction} from 'app/utils/callIfFunction';
import Card from 'app/components/card';

type Props = {
  title?: string;
  subtitle?: string;
  queryDetail?: string;
  starred?: boolean;
  to: object;
  onEventClick?: () => void;
  renderGraph: () => React.ReactNode;
  renderContextMenu?: () => React.ReactNode;
};

class QueryCard extends React.PureComponent<Props> {
  handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const {onEventClick, to} = this.props;

    callIfFunction(onEventClick);
    browserHistory.push(to);
  };

  render() {
    const {
      title,
      subtitle,
      starred,
      queryDetail,
      renderContextMenu,
      renderGraph,
    } = this.props;

    return (
      <Link data-test-id={`card-${title}`} onClick={this.handleClick} to={this.props.to}>
        <StyledQueryCard interactive>
          <QueryCardHeader>
            <QueryCardContent>
              <QueryTitle>{title}</QueryTitle>
              <QueryDetail>{queryDetail}</QueryDetail>
            </QueryCardContent>
            {starred && <Avatar data-test-id="is-saved-query" />}
          </QueryCardHeader>
          <QueryCardBody>{renderGraph()}</QueryCardBody>
          <QueryCardFooter>
            <StyledCreator>{subtitle}</StyledCreator>
            {renderContextMenu && renderContextMenu()}
          </QueryCardFooter>
        </StyledQueryCard>
      </Link>
    );
  }
}

const QueryCardContent = styled('div')`
  flex-grow: 1;
  overflow: hidden;
  margin-right: ${space(1)};
`;

const Avatar = styled('div')`
  border: 2px solid ${p => p.theme.gray1};
  border-radius: 50%;
  min-width: ${space(4)};
  width: ${space(4)};
  height: ${space(4)};
`;

const StyledQueryCard = styled(Card)`
  justify-content: space-between;
  height: 100%;
  &:focus,
  &:hover {
    top: -1px;
  }
`;

const QueryCardHeader = styled('div')`
  display: flex;
  padding: ${space(1.5)} ${space(2)};
`;

const QueryTitle = styled('div')`
  color: ${p => p.theme.textColor};
  ${overflowEllipsis};
`;

const QueryDetail = styled('div')`
  font-family: ${p => p.theme.text.familyMono};
  font-size: ${p => p.theme.fontSizeSmall};
  color: ${p => p.theme.gray2};
  line-height: 1.5;
  ${overflowEllipsis};
`;

const QueryCardBody = styled('div')`
  background: ${p => p.theme.offWhite};
  max-height: 100px;
  height: 100%;
  overflow: hidden;
`;

const QueryCardFooter = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${space(1)} ${space(2)};
  color: ${p => p.theme.gray3};
`;

const StyledCreator = styled('div')`
  font-size: ${p => p.theme.fontSizeSmall};
  display: flex;
  align-items: center;
  ${overflowEllipsis};
`;

export default QueryCard;
