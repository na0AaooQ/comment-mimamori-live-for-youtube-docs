# こめんとみまもり Live 公開ドキュメントの管理リポジトリ

## リポジトリの役割

本リポジトリは、Google Chrome拡張機能「こめんとみまもり Live」の利用者向け公開ドキュメントを管理します。管理対象は、日本語・英語のサービス説明、操作マニュアル、プライバシーポリシーと、共通CSS・JavaScriptと公開用画像などのWebページ用アセットです。

Chrome拡張機能本体のソースコードや内部設計文書は管理対象外です。

開発中の v0.2.0 BETA版に関する利用者向け資料を管理しています。現在、Chrome ウェブストアでの一般公開は行っていません。

## 公開ページ

| 文書 | 日本語 | 英語 |
| --- | --- | --- |
| サービス説明 | [日本語](https://commentlive.kokoromimamori.na0aaooq.com/about.html) | [English](https://commentlive.kokoromimamori.na0aaooq.com/en/about.html) |
| 操作マニュアル | [日本語](https://commentlive.kokoromimamori.na0aaooq.com/manual.html) | [English](https://commentlive.kokoromimamori.na0aaooq.com/en/manual.html) |
| プライバシーポリシー | [日本語](https://commentlive.kokoromimamori.na0aaooq.com/privacy.html) | [English](https://commentlive.kokoromimamori.na0aaooq.com/en/privacy.html) |

公開サイトはGitHub Pagesでホスティングしています。現在の公開設定は次のとおりです。

- Source: Deploy from a branch
- Branch: `main`
- Folder: `/docs`
- Custom domain: `commentlive.kokoromimamori.na0aaooq.com`
- HTTPS: 有効

公開設定の変更には、リポジトリ所有者の明示承認が必要です。保守時の作業ルールは[AGENTS.md](AGENTS.md)を参照してください。

## 開発環境

静的HTMLと共通CSS・JavaScriptを使用し、GitHub Pagesで公開します。編集・確認にはGit、Webブラウザ、HTML/CSSを編集できるエディタを使用します。

`package.json`やビルド基盤はなく、ビルド作業は不要です。

操作マニュアル用の公開承認済みPNG画像64枚を `docs/assets/img/manual/` で管理します。日英マニュアルはそれぞれ33枚を掲載し、共用画像2枚を同じファイルから参照します。画像はライトボックスで拡大できます。操作イメージ動画3本は、利用者様が選択した動画だけを読み込むClick-to-load方式で掲載します。

## ローカルでの動作確認

動画の埋め込みを含めて確認するには、ローカルHTTPサーバーを使用します。Python 3が利用できる場合は、リポジトリルートで次のコマンドを実行できます。

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory docs
```

起動後は、例えば[日本語サービス説明](http://127.0.0.1:8000/about.html)や[英語サービス説明](http://127.0.0.1:8000/en/about.html)を開きます。`docs/index.html`はないため、サイトルートではなく個別HTMLのURLへアクセスしてください。確認後は起動したターミナルで Ctrl+C を押して停止します。

確認項目:

- 日本語・英語の6ページが表示できる。
- 各言語の3ページ間のナビゲーションが動作する。
- 日英切替リンクが対応するページへ移動する。
- 各ページの目次から対象セクションへ移動できる。
- 共通CSSが読み込まれる。
- スマートフォン幅等でも大きく表示が崩れない。
- Tab・Enter等でリンクを操作でき、フォーカス位置が分かる。
- 日英それぞれ33枚の画像を表示・拡大でき、クリック、キーボード、背景の操作で開閉し、元の画像にフォーカスが戻る。
- 動画を表示するまではプレーヤーや動画関連の外部リクエストがなく、表示操作を行った動画だけが読み込まれる。
- JavaScript無効時もマニュアルの本文・画像・YouTubeへの直接リンクが利用できる。

## ライセンス・著作権

Copyright © 2026 青木直之 (@na0AaooQ). All Rights Reserved.

本リポジトリに含まれるソースコード、デザイン、ドキュメントのうち、著作権者が作成し権利を有するものについて、著作権を留保します。MIT等のオープンソースライセンスは付与していません。

公開Webページの閲覧、およびGitHub上での閲覧・ForkなどGitHub利用規約で認められる利用は可能です。GitHub利用規約、適用法令、著作権者による個別許諾で認められる場合を除き、無断転載、再配布、派生物の公開、商用・非商用サービスへの流用を許諾しません。

第三者が権利を有する著作物や商標について、開発者が一律に権利を主張するものではありません。

参考: [GitHubのライセンスに関する説明](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository)、[GitHub利用規約 D.5](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service#5-license-grant-to-other-users)

## お問い合わせ

開発者が公開している[お問い合わせページ](https://portfolio.na0aaooq.com/contact.html)をご確認ください。
