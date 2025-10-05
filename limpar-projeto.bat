@echo off
echo 🧹 Limpando projeto para publicação...

REM Renomear arquivos melhorados
echo ✅ Renomeando arquivos melhorados...
copy "index-melhorado.html" "index.html" >nul
copy "netlify-melhorado.toml" "netlify.toml" >nul
copy "README-melhorado.md" "README.md" >nul

REM Remover arquivos desnecessários
echo ❌ Removendo arquivos desnecessários...
del "cronograma-usf-apipucos-2025-09-27.html" 2>nul
del "cronograma-usf-apipucos-2025-09-27.json" 2>nul
del "cronograma-usf-apipucos.html" 2>nul
del "package-melhorado.json" 2>nul
del "server.js" 2>nul
del "404.html" 2>nul
del "GUIDE.md" 2>nul
del "DEPLOY-GUIDE.md" 2>nul
rmdir /s /q "public" 2>nul

echo ✅ Limpeza concluída!
echo.
echo 📁 Arquivos finais para publicação:
dir /b *.html *.json *.jpeg *.js *.toml *.md
echo.
echo 🚀 Projeto pronto para deploy!
pause