class StatsService {
  constructor() {
    this.stats = JSON.parse(localStorage.getItem('ecoSortStats')) || {
      totalItems: 0,
      totalPoints: 0,
      totalImpact: 0, // kg CO2 saved
      accuracy: 98.4
    };
  }

  saveStats() {
    localStorage.setItem('ecoSortStats', JSON.stringify(this.stats));
  }

  addScan(categoryData) {
    if (categoryData.points) {
      this.stats.totalItems += 1;
      this.stats.totalPoints += categoryData.points;
      this.stats.totalImpact += categoryData.impact || 0;
      this.saveStats();
      return true;
    }
    return false;
  }

  getStats() {
    return this.stats;
  }
}

export default new StatsService();
