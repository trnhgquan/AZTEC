import apis from '~uiModules/apis';

const stepApproveERC20 = {
    name: 'approveERC20',
    descriptionKey: 'deposit.approve.description',
    blockStyle: 'linked',
    tasks: [
        {
            type: 'sign',
            run: apis.asset.approveERC20Allowance,
        },
    ],
    submitTextKey: 'transaction.approve.submit',
};

const stepConfirm = {
    name: 'confirmTransaction',
    descriptionKey: 'transaction.gsn.send.description',
    blockStyle: 'overlapped',
    tasks: [
        {
            run: apis.proof.deposit,
        },
    ],
    submitTextKey: 'transaction.send.submit',
};

const stepTransferViaGSN = {
    name: 'send',
    descriptionKey: 'deposit.send.description',
    blockStyle: 'sealed',
    tasks: [
        {
            titleKey: 'transaction.step.create.proof',
            run: apis.mock,
        },
        {
            titleKey: 'transaction.step.sign',
            run: apis.mock,
        },
        {
            type: 'sign',
            titleKey: 'deposit.approve.public',
            run: apis.ace.publicApprove,
        },
        {
            titleKey: 'transaction.step.relay',
        },
    ],
    showTaskList: true,
    submitTextKey: 'deposit.approve.submit',
};

const stepSend = {
    name: 'send',
    descriptionKey: 'deposit.send.description',
    blockStyle: 'sealed',
    tasks: [
        {
            titleKey: 'transaction.step.create.proof',
            run: apis.mock,
        },
        {
            titleKey: 'transaction.step.sign',
            run: apis.mock,
        },
        {
            titleKey: 'transaction.step.send',
            run: apis.asset.deposit,
        },
        {
            titleKey: 'transaction.confirmed',
        },
    ],
    showTaskList: true,
    submitTextKey: 'transaction.send.submit',
};

const stepSendViaGSN = {
    name: 'send',
    descriptionKey: 'transaction.gsn.send.description',
    blockStyle: 'sealed',
    tasks: [
        {
            titleKey: 'transaction.step.create.proof',
            run: apis.mock,
        },
        {
            titleKey: 'transaction.step.sign',
            run: apis.mock,
        },
        {
            titleKey: 'transaction.step.relay',
            run: apis.asset.deposit,
        },
        {
            titleKey: 'transaction.confirmed',
        },
    ],
    showTaskList: true,
    autoStart: true,
    submitTextKey: 'transaction.send.submit',
};

export default {
    gsn: [
        stepApproveERC20,
        stepConfirm,
        stepSendViaGSN,
    ],
    gsnTransfer: [
        stepApproveERC20,
        stepConfirm,
        stepTransferViaGSN,
    ],
    metamask: [
        stepApproveERC20,
        stepConfirm,
        stepSend,
    ],
};