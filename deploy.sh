# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹，这里是默认的路径，能够自定义
cd ./public

# 若是是发布到自定义域名
# echo 'www.isunbeam.cn' > CNAME

git init
git add -A
git commit -m 'deploy'

# 若是发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:<BranchName>
git push -f https://github.com/eddie-Peng-Yuyan/eddie-Peng-Yuyan.github.io.git master:blogs

cd -

# 最后发布的时候执行 bash deploy.sh
