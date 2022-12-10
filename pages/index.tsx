import { useState } from 'react';
import Script from 'next/script';
import QRCode from 'react-qr-code';
import { IconGitCommit } from '@tabler/icons';
// import Link from 'next/link';
import { Button, Container } from '@mantine/core';
import { ExplainationHeader } from '../components/PaperWallet/Header/ExplanationHeader.component';
import WalletsList from '../components/PaperWallet/card-list/card-list.component';

declare const window: any;
export default function PaperWallet() {
    const [accounts, setAccounts] = useState<Array<Object>>([]);
    function createKeys() {
        const accountsHolder = [];
        // eslint-disable-next-line no-plusplus
        for (let x = 0; x < 10; x++) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { bsv } = window;
            const { nimble } = window;
            const privateKey = nimble.PrivateKey.fromRandom();
            const account = { pk: privateKey.toString(),
                            pubKey: privateKey.toPublicKey().toString(),
                            address: privateKey.toAddress().toString(),
                        };
            accountsHolder.push(account);
        }
        setAccounts(accountsHolder);
    }
    return (<>
                    <Button
                      component="a"
                      href="https://github.com/ZacharyWeiner/paper-wallet-sv"
                      leftIcon={<IconGitCommit size={18} />}
                      styles={(theme) => ({
                            root: {
                            backgroundColor: '#00acee',
                            border: 0,
                            height: 42,
                            paddingLeft: 20,
                            paddingRight: 20,
                            marginLeft: 12,
                            marginTop: 12,

                            '&:hover': {
                                backgroundColor: theme.fn.darken('#00acee', 0.05),
                            },
                            },

                            leftIcon: {
                            marginRight: 15,
                            },
                        })}
                    >
                        View GitHub Repo
                    </Button>
                <ExplainationHeader onClickHandler={createKeys} />
                <WalletsList accounts={accounts} />
                <Script src="https://unpkg.com/bsv@1.5.6" />
                <Script src="https://unpkg.com/bsv@1.5.6/bsv-message.min.js" />
                <Script src="https://unpkg.com/bsv@1.5.6/bsv-mnemonic.min.js" />
                <Script src="https://unpkg.com/@runonbitcoin/nimble" />
                <Script src="https://unpkg.com/run-sdk" />
            </>);
}
