import React from "react";
import {
  Container,
  Content,
  OverviewCard,
  IconContainer,
  Group,
  CountContainer,
  Text,
} from "./style";
import { Header, theme } from "../../style";
import ShoppingIcon from "../../../../zeedas-assets/icons/icon-shopping-bag";
import { connect } from "react-redux";
import { testStatsSelector } from "../../../../state/redux/test/actions";

export const Overview = (props) => {
  const { stats } = props;
  const {
    failed,
    improvements,
    passed,
    totalModuleTestCases,
    untested,
    totalModules,
  } = stats;

  return (
    <Container>
      <Header>
        <h3>Quick Overview</h3>
      </Header>
      <Content>
        <div className="row">
          <OverviewCard color={theme.colors.$zdOrange}>
            <Group>
              <IconContainer color={theme.colors.$zdOrange}>
                <ShoppingIcon />
              </IconContainer>
              <CountContainer>{totalModules}</CountContainer>
            </Group>
            <Group>
              <Text>Total Modules</Text>
            </Group>
          </OverviewCard>
          <OverviewCard color={theme.colors.$zdBlueInverse}>
            <Group>
              <IconContainer color={theme.colors.$zdOrange}>
                <ShoppingIcon />
              </IconContainer>
              <CountContainer>{improvements}</CountContainer>
            </Group>
            <Group>
              <Text>Improvements</Text>
            </Group>
          </OverviewCard>
        </div>
        <div className="row">
          <OverviewCard color={theme.colors.$zdBlue}>
            <Group>
              <IconContainer color={theme.colors.$zdOrange}>
                <ShoppingIcon />
              </IconContainer>
              <CountContainer>{totalModuleTestCases}</CountContainer>
            </Group>
            <Group>
              <Text>Total Modules Test</Text>
            </Group>
          </OverviewCard>
          <OverviewCard color={theme.colors.$zdDarkPink}>
            <Group>
              <IconContainer color={theme.colors.$zdOrange}>
                <ShoppingIcon />
              </IconContainer>
              <CountContainer>{failed}</CountContainer>
            </Group>
            <Group>
              <Text>Total Failed</Text>
            </Group>
          </OverviewCard>
        </div>
        <div className="row">
          <OverviewCard color={theme.colors.$zdGreen}>
            <Group>
              <IconContainer color={theme.colors.$zdOrange}>
                <ShoppingIcon />
              </IconContainer>
              <CountContainer>{passed}</CountContainer>
            </Group>
            <Group>
              <Text>Total Passed</Text>
            </Group>
          </OverviewCard>
          <OverviewCard color={theme.colors.$zdPurple}>
            <Group>
              <IconContainer color={theme.colors.$zdOrange}>
                <ShoppingIcon />
              </IconContainer>
              <CountContainer>{untested}</CountContainer>
            </Group>
            <Group>
              <Text>Total Untested</Text>
            </Group>
          </OverviewCard>
        </div>
      </Content>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  stats: testStatsSelector(state),
});

export default connect(mapStateToProps)(Overview);
