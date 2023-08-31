const { renderHook, act } = require('@testing-library/react-hooks');
const { handleCreateEnd } = require('@/components/List/index.jsx');
const { expect, test } = require('@jest/globals');

test('وقتی ورودی معتبر داده می‌شود، آیتم‌های جدید اضافه می‌شوند', () => {
    const { result } = renderHook(() => handleCreateEnd());

    const inputValue = 'مورد 1\nمورد 2\nمورد 3';
    const listIndex = 0;

    act(() => {
        result.current.handleCreateEnd(inputValue, listIndex);
    });

    const { items } = result.current;

    expect(items.length).toBe(3);
    expect(items[0].content).toBe('مورد 1');
    expect(items[1].content).toBe('مورد 2');
    expect(items[2].content).toBe('مورد 3');
});

test('وقتی ورودی خالی داده می‌شود، هیچ آیتمی اضافه نمی‌شود', () => {
    const { result } = renderHook(() => useYourCustomHook());

    const inputValue = '';
    const listIndex = 0;

    act(() => {
        result.current.handleCreateEnd(inputValue, listIndex);
    });

    const { items } = result.current;

    expect(items.length).toBe(0);
});

test('وقتی ورودی شامل خطوط خالی باشد، تنها آیتم‌های غیر خالی اضافه می‌شوند', () => {
    const { result } = renderHook(() => useYourCustomHook());

    const inputValue = 'مورد 1\n  \nمورد 2\n\nمورد 3';
    const listIndex = 0;

    act(() => {
        result.current.handleCreateEnd(inputValue, listIndex);
    });

    const { items } = result.current;

    expect(items.length).toBe(3);
    expect(items[0].content).toBe('مورد 1');
    expect(items[1].content).toBe('مورد 2');
    expect(items[2].content).toBe('مورد 3');
});
