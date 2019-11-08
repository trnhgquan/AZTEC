import React from 'react';
import PropTypes from 'prop-types';
import {
    FlexBox,
    Block,
    Text,
} from '@aztec/guacamole-ui';
import {
    assetShape,
} from '~ui/config/propTypes';
import i18n from '~ui/helpers/i18n';
import formatAddress from '~ui/utils/formatAddress';
import PopupContent from '~ui/components/PopupContent';
import ListItem from '~ui/components/ListItem';
import ProfileIconGroup from '~ui/components/ProfileIconGroup';


const DomainPermissionTransaction = ({
    assets,
    loading,
    error,
}) => {
    const [firstAsset] = assets;
    const icons = [];
    let moreItems;
    if (assets.length > 1) {
        const maxAvatars = 3;
        assets.slice(0, maxAvatars).forEach(({
            address, linkedTokenAddress,
            code,
        }) => {
            icons.push({
                profile: {
                    type: 'asset',
                    address,
                    linkedTokenAddress,
                },
                tooltip: i18n.token(code) || formatAddress(address, 12, 6),
            });
        });
        if (assets.length > maxAvatars) {
            moreItems = assets.slice(maxAvatars).map(({
                address,
                linkedTokenAddress,
            }, i) => (
                <ListItem
                    key={+i}
                    className="text-code"
                    profile={{
                        type: 'asset',
                        address,
                        linkedTokenAddress,
                    }}
                    content={formatAddress(address, 12, 6)}
                    size="xxs"
                />
            ));
        }
    }

    return (
        <PopupContent
            theme="white"
            loading={loading}
            error={error}
        >
            <FlexBox
                align="center"
                valign="center"
                direction="column"
                stretch
                nowrap
                expand
            >
                <Block padding="0 l xl l">
                    <Text
                        text={i18n.t('domain.permission.explain')}
                        size="s"
                        weight="light"
                    />
                </Block>
                <Block padding="l">
                    {assets.length === 1 && (
                        <ListItem
                            profile={{
                                type: 'asset',
                                address: firstAsset.address,
                                linkedTokenAddress: firstAsset.linkedTokenAddress,
                            }}
                            content={(
                                <div>
                                    <Text
                                        size="s"
                                        text={i18n.token(firstAsset.code)}
                                        weight="semibold"
                                        showEllipsis
                                    />
                                    <Text
                                        className="text-code"
                                        text={formatAddress(firstAsset.address, 12, 6)}
                                        color="label"
                                        size="xxs"
                                    />
                                </div>
                            )}
                        />
                    )}
                    {assets.length > 1 && (
                        <ProfileIconGroup
                            theme="white"
                            size="s"
                            icons={icons}
                            moreItems={moreItems}
                        />
                    )}
                </Block>
                <Block padding="xl l l l">
                    <Text
                        text={i18n.t('domain.permission.footer')}
                        size="s"
                    />
                </Block>
            </FlexBox>
        </PopupContent>
    );
};

DomainPermissionTransaction.propTypes = {
    assets: PropTypes.arrayOf(assetShape),
    loading: PropTypes.bool,
    error: PropTypes.shape({
        key: PropTypes.string,
        message: PropTypes.string,
        response: PropTypes.object,
        fetal: PropTypes.bool,
    }),
};

DomainPermissionTransaction.defaultProps = {
    assets: [],
    loading: false,
    error: null,
};

export default DomainPermissionTransaction;
