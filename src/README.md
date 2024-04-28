To know how it works, start from (main/lib/index.ts -> main/index.ts -> preload/index.ts -> preload/index.d.ts -> renderer/src/store/index.ts -> renderer/src/hooks/index.ts -> renderer/src/home/HomePage.ts);

Check out hooks/auto-saving. It uses throttling, which may be helpful.

Take a look at main/lib/index.ts. dialog.showMessageBox can be helpful if we want the user to confirm deletion or something.

When using constants, please place them in the shared folder. This ensures that if we need to change the value in the future, it will be easier to manage.