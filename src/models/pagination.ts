export class Pagination {
  page: number;
  limit: number;
  total: number;
  constructor(pagination: Pagination) {
    this.page = pagination.page;
    this.limit = pagination.limit;
    this.total = pagination.total;
  }
    
    static new() {
        return new Pagination({
            page: 1,
            limit: 50,
            total: 0,
        });
    }
}
