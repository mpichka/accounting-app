import { Product } from '@/models/product';
import { AdditionalExpenses } from '@/redux/modules/additionalExpenses/type';
import { invoke } from '@tauri-apps/api/tauri';

export class Commands {
  static async syncCurrencyRates(): Promise<any> {
    console.log('[INVOKE] sync_currency_rates');
    // const res = await invoke('sync_currency_rates');
    // console.log('result', res);
    // return res;
  }

  static async updateAdditionalExpenses(
    payload: AdditionalExpenses
  ): Promise<any> {
    console.log('[INVOKE] update_additional_expenses');
    console.log('payload', payload);
    const res = await invoke('update_additional_expenses', { data: payload });
    console.log('result', res);
    return res;
  }

  static async fetchAdditionalExpenses(): Promise<any> {
    console.log('[INVOKE] fetch_additional_expenses');
    const res = await invoke('fetch_additional_expenses');
    console.log('result', res);
    return res;
  }

  static async saveProduct(payload: any): Promise<any> {
    console.log('[INVOKE] save_product');
    console.log('payload', payload);
    const res: any = await invoke('save_product', {
      data: new Product(payload).convertToRust(),
    });
    console.log('result', res);
    return new Product(res.data).convertToJS();
  }

  static async calculateProductPreview(payload: any): Promise<any> {
    console.log('[INVOKE] calculate_product_preview');
    console.log('payload', payload);
    const res = await invoke('calculate_product_preview', {
      data: new Product(payload).convertToRust(),
    });
    console.log('result', res);
    return res;
  }

  static async fetchProductById(payload: any): Promise<any> {
    console.log('[INVOKE] fetch_product_by_id');
    console.log('payload', payload);
    const res: any = await invoke('fetch_product_by_id', {
      data: payload,
    });
    console.log('result', res);
    return new Product(res).convertToJS();
  }

  static async fetchProductsList(payload: any): Promise<any> {
    console.log('[INVOKE] fetch_products_list');
    console.log('payload', payload);
    const res: any = await invoke('fetch_products_list', {
      data: payload,
    });
    // return res.map((item) => new Product(item).convertToJS());
    return res;
  }

  static async fetchAllProductCategories(): Promise<string[]> {
    console.log('[INVOKE] fetch_all_product_categories');
    const res: any = await invoke('fetch_all_product_categories');
    console.log('result', res);
    return res;
  }
}
