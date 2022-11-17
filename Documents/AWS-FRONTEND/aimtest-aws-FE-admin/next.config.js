/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'assets.codepen.io',
      'i.pravatar.cc',
      'images.unsplash.com',
      'picsum.photos',
      'aimtest-s3-bucket.s3.ap-northeast-1.amazonaws.com',
      'aimtest-s3-bucket.s3.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
