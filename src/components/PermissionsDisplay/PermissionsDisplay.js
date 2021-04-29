/* eslint-disable react/no-danger */
/* We knowingly use dangerouslySetInnerHTML here, we don't need
   to be chastised for it */
import React from 'react';
import PropTypes from 'prop-types';

import { injectIntl } from 'react-intl';

import { stripesConnect } from '@folio/stripes/core';
import { Loading } from '@folio/stripes/components';

import { Tabs, TabList, Tab, TabPanel } from '../Tabs';

import css from './PermissionsDisplay.css';

class PermissionsDisplay extends React.Component {
    static manifest = Object.freeze({
      claPermissions: {
        type: 'rest',
        root: 'https://api.cla.co.uk/check-permissions/v1/GetPermissionByIdentifier',
        path: (_q, _p, _r, _l, props) => {
          const config = props.resources?.config?.records?.[0];
          if (config) {
            const parsed = JSON.parse(config.value);
            return `${props.type}/${props.value}/${parsed.licence}`;
          }
          return null;
        },
        params: {
          usageTypes: '1,2',
          messageId: Math.floor(Date.now() / 1000).toString(),
          htmlToggle: 'true'
        },
        headers: {
          'Ocp-Apim-Subscription-Key': (_q, _p, _r, _l, props) => {
            const config = props.resources?.config?.records?.[0];
            if (config) {
              const parsed = JSON.parse(config.value);
              return parsed.apiKey;
            }
            return null;
          }
        }
      },
      config: {
        type: 'okapi',
        records: 'configs',
        path: 'configurations/entries?query=(module==CLAPERMISSIONSCHECK%20and%20configName==apiSettings)'
      }
    });

    static propTypes = {
      resources: PropTypes.shape({
        config: PropTypes.shape({
          records: PropTypes.array.isRequired
        }),
        claPermissions: PropTypes.shape({
          records: PropTypes.array,
          isPending: PropTypes.bool
        })
      }).isRequired,
      intl: PropTypes.object
    };

    getIcon(usage) {
      return ['Permitted', 'available'].includes(usage.reportType) ?
        <span role="img" aria-label={this.props.intl.formatMessage({ id: 'ui-plugin-cla-permissions-check.copyingPermitted' })} className={css.permitted}>{String.fromCharCode(10004)}</span> :
        <span role="img" aria-label={this.props.intl.formatMessage({ id: 'ui-plugin-cla-permissions-check.copyingProhibited' })} className={css.notPermitted}>{String.fromCharCode(10006)}</span>;
    }

    getDangerousProp(data, prop) {
      return { __html: data[prop] };
    }

    getValidUsages(usages) {
      return usages.filter(
        (toFilter) => toFilter.usageType.length > 0
      );
    }

    render() {
      const container = this.props.resources?.claPermissions?.records?.[0];
      if (this.props.resources?.claPermissions?.isPending) {
        return <div role="alert" aria-busy="true" className={css.loading}><Loading size="large" /></div>;
      }

      const usages = container?.usagesSummary;
      if (!usages) {
        return null;
      }

      return (
        <div role="region" className={css.container}>
          {(container.metadata?.title?.length > 0 ||
              container.metadata?.contributor?.length > 0) &&
              <div className={css.metadata}>
                <h1>{container.metadata.title}</h1>
                <h2>{container.metadata.contributor.join('; ')}</h2>
              </div>
          }
          <Tabs>
            <TabList>
              {this.getValidUsages(usages).map(
                (usage) => <Tab key={usage.usageTypeId}>{usage.usageType}</Tab>
              )}
            </TabList>
            {this.getValidUsages(usages).map((usage) => (
              <TabPanel key={usage.usageTypeId}>
                <>
                  <div className={css.summary}>
                    <div className={css.text}>
                      <h3 dangerouslySetInnerHTML={this.getDangerousProp(usage.header, 'title')} />
                      <h4 dangerouslySetInnerHTML={this.getDangerousProp(usage.header, 'introduction')} />
                    </div>
                    <div className={css.icon}>
                      {this.getIcon(usage)}
                    </div>
                  </div>
                  <ul>
                    {usage.usageDetails && usage.usageDetails.map(
                      (detail, index) => <li key={index}>{detail.title}</li>
                    )}
                  </ul>
                  <div className={css.footer}>
                    <p dangerouslySetInnerHTML={this.getDangerousProp(usage, 'restrictions')} />
                    <p dangerouslySetInnerHTML={this.getDangerousProp(usage, 'terms')} />
                  </div>
                </>
              </TabPanel>
            ))}
          </Tabs>
        </div>
      );
    }
}

export default injectIntl(stripesConnect(PermissionsDisplay));
