/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Static exportではrewritesが無効なので、環境変数でクライアント側で直接APIサーバーにアクセス
}

module.exports = nextConfig