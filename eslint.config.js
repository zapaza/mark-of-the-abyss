import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        // Игнорируемые папки
        ignores: ['dist', 'node_modules', 'public', 'docs'],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parserOptions: {
                projectService: {
                    allowDefaultProject: ['*.ts'],
                },
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    },
);