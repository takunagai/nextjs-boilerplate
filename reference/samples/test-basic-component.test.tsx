import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// テスト対象のシンプルなコンポーネント
function Greeting({ name }: { name: string }) {
  return (
    <div>
      <h1>こんにちは、{name}さん</h1>
      <p>基本的なコンポーネントテストのサンプルです。</p>
    </div>
  );
}

describe('基本的なコンポーネントテスト', () => {
  it('正しくレンダリングされる', () => {
    render(<Greeting name="太郎" />);
    
    // 見出しのテキストを検証
    expect(screen.getByRole('heading')).toHaveTextContent('こんにちは、太郎さん');
    
    // 段落のテキストを検証
    expect(screen.getByText('基本的なコンポーネントテストのサンプルです。')).toBeInTheDocument();
  });

  it('異なる名前でレンダリングされる', () => {
    render(<Greeting name="花子" />);
    expect(screen.getByRole('heading')).toHaveTextContent('こんにちは、花子さん');
  });
});
