import React from 'react';
import PropTypes from 'prop-types';
import {
    FlexBox,
    Block,
    Text,
} from '@aztec/guacamole-ui';
import i18n from '~ui/helpers/i18n';
import {
    formatValue,
} from '~ui/utils/asset';
import formatAddress from '~ui/utils/formatAddress';
import Connection from '~ui/components/Connection';
import PopupContent from '~ui/components/PopupContent';

const WithdawSend = ({
    asset: {
        code,
        address: assetAddress,
        linkedTokenAddress,
    },
    transactions: [firstTransaction],
}) => (
    <PopupContent
        theme="white"
    >
        <FlexBox
            direction="column"
            align="center"
            valign="center"
            className="flex-free-expand"
            expand
            stretch
            nowrap
        >
            <Block padding="m xl">
                <Connection
                    theme="white"
                    from={{
                        profile: {
                            type: 'token',
                            address: assetAddress,
                            linkedTokenAddress,
                            alt: code,
                        },
                        description: formatAddress(linkedTokenAddress, 6, 4),
                    }}
                    to={{
                        profile: {
                            type: 'asset',
                            address: assetAddress,
                            linkedTokenAddress,
                        },
                        description: formatAddress(assetAddress, 6, 4),
                    }}
                    size="s"
                    actionIconName="double_arrow"
                />
            </Block>

            <Block padding="0 xl">
                <Text
                    text={i18n.t('withdraw.send.explain')}
                    size="xxs"
                    color="label"
                />
            </Block>
        </FlexBox>
    </PopupContent>
);

WithdawSend.propTypes = {
    asset: PropTypes.shape({
        address: PropTypes.string.isRequired,
        code: PropTypes.string,
    }).isRequired,
    transactions: PropTypes.arrayOf(PropTypes.shape({
        amount: PropTypes.number.isRequired,
        to: PropTypes.string.isRequired,
    })).isRequired,
};

export default WithdawSend;